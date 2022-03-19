// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WeConnect is ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl, EIP712, ERC721Votes {
    using Counters for Counters.Counter;

    // so far, we only manage the 1v1 conversation so a chat contains a PAIR of addresses
    address[2] private _members;
    mapping (uint256 => string) private _conversation;
    mapping (uint256 => bool) private _msgEmitter;
    uint256[2] private _lastReadMessage;

//It could be interesting to make an ownership transfer
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;


//Original constructor
    // constructor() ERC721("WeConnect", "MTK") EIP712("WeConnect", "1") {
    //     _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    //     _grantRole(MINTER_ROLE, msg.sender);
    // }


    constructor(address user1, address user2) ERC721("WeConnect", "MTK") EIP712("WeConnect", "1") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        _members[0] = user1;
        _members[1] = user2;

    }

// Original function of the ERC 721
//     function safeMint(address to, string memory uri) public onlyRole(MINTER_ROLE) {
//         uint256 tokenId = _tokenIdCounter.current();
//         _tokenIdCounter.increment();
//         _safeMint(to, tokenId);
//         _setTokenURI(tokenId, uri);
//     }

// Minting of a message
    function safeMintMessage(address to, bool userID, string memory hash) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        _conversation[_tokenIdCounter.current()] = hash;
        _msgEmitter[_tokenIdCounter.current()] = userID;
        //A user cannot send a message without having read all the previous ones
        _lastReadMessage[userID ? 1 : 0] = _tokenIdCounter.current();
    }

// Minting of a message with multimedia content
    function safeMintMessage(address to, bool userID, string memory hash, string memory uri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        _conversation[_tokenIdCounter.current()] = hash;
        _msgEmitter[_tokenIdCounter.current()] = userID;

        _setTokenURI(tokenId, uri);

        //A user cannot send a message without having read all the previous ones
        _lastReadMessage[userID ? 1 : 0] = _tokenIdCounter.current();
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId);
    }


//This function will have to be destroyed/deactivated
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        //super._burn(tokenId);
    }


//To get multimedia messages
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

//Each time a user opens the app or updates its reading list
    function userOpensApp(bool userID) internal
    {
        _ack(_tokenIdCounter.current(), userID);
    }

// To retrieve a message - used by the scanner
    function retrieveMessage(uint256 tokenId) public view returns (string memory)
    {
        return _conversation[tokenId];
    }

// Acknowledgement
    function _ack(uint256 tokenId, bool userID) internal
    {
        if (_lastReadMessage[userID ? 1 : 0] < tokenId)
            _lastReadMessage[userID ? 1 : 0] = tokenId;
    }

// To retrieve the sender ID
    function retrieveSenderID(uint256 tokenId) public view returns (bool)
    {
        return _msgEmitter[tokenId];
    }

// To retrieve the sender address
    function retrieveSenderAddress(uint256 tokenId) public view returns (address)
    {
        
        return _members[_msgEmitter[tokenId]? 1 : 0];
    }



    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

