import UserResults from "../components/users/UserResults";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import generatekeypair from "../components/layout/crypto/generateKeyPair";
import UserItem from "../components/users/UserItem";
import encrypt from "../components/layout/crypto/encrypt";

//utxo represente la Transaction Hash

function Home() {
	const [hash, setHash] = useState(""); // ce hash correspond au message
	const [realhash, setRealHash] = useState(""); // ce hash correspond au message

	const [key, setKey] = useState("");
	const [id, setId] = useState("");
	const [dianee, setDianee] = useState("");
	const [messageCrypted, setMessageCrypted] = useState("");
	const [keyCrypted, setKeyCrypted] = useState("");
	const [haveInput, setHaveInput] = useState(false);

	const [address, setAddress] = useState("");
	const [loadingAddress, setLoadingAddress] = useState(true);

	const handleChangeHash = (e) => setHash(e.target.value);
	const handleChangeKey = (e) => setKey(e.target.value);
	const handleChangeId = (e) => setId(e.target.value);

	const [searchParams, setSearchParams] = useSearchParams();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (hash !== "" || key !== "") {
			// dispatch({ type: "SET_LOADING" });
			// const users = await searchUsers(text);
			// dispatch({ type: "GET_USERS", payload: users });

			// setText("");
			console.log(hash);
			console.log(key);
		}
		fetchAddress();
	};

	const fetchAddress = async (utxo) => {
		const response = await fetch(
			`https://api-mumbai.polygonscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${utxo}&apikey=${process.env.REACT_APP_POLYGONSCAN_APIKEY}`,
			{}
		);
		const transaction_list = await response.json();
		console.log("transaction_list: ", transaction_list);

		setAddress(transaction_list);
		setLoadingAddress(false);

		const diane = await fetch(`http://167.71.129.58:3000/api/api/${transaction_list.result.input}`, {});

		setDianee(JSON.stringify(await diane.json()));
		setHaveInput(true);
	};
	/*
	const fetchDiane = async () => {
		const response = await fetch(
			`https://api-mumbai.polygonscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${id}&apikey=${process.env.REACT_APP_POLYGONSCAN_APIKEY}`,
			{}
		);
		const transaction_list = await response.json();
		console.log(transaction_list);

		setAddress(transaction_list);
		setLoadingAddress(false);
	};
*/
	function displayJson(JSON) {
		JSON.stringify({ foo: "sample", bar: "sample" }, null, 4);
	}

	const handleGenerateClick = async () => {};

	const display = async (e) => {
		e.preventDefault();

		console.log("Display");

		console.log();
	};

	async function sha256(message) {
		// encode as UTF-8
		const msgBuffer = new TextEncoder().encode(message);

		// hash the message
		const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

		// convert ArrayBuffer to Array
		const hashArray = Array.from(new Uint8Array(hashBuffer));

		// convert bytes to hex string
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
		return hashHex;
	}

	useEffect(async () => {
		// const [publicKeyJwk, privateKeyJwk] = generatekeypair();
		// console.log(publicKeyJwk)
		// console.log(privateKeyJwk)
		handleGenerateClick();
		/*const elemURL_3 = window.location.search.substring(1).split("&").join("=").split("=");

		if (elemURL[0] === "key") {
			setKey(elemURL[1]);
		}
		if (elemURL[2] === "message") {
			setHash(elemURL[3]);
		}
		if (elemURL[4] === "id") {
			setId(elemURL[5]);
		}*/

		let keyBase = searchParams.get("key");
		let messageBase = searchParams.get("message");
		let utxo = searchParams.get("utxo");

		var keyJWK = JSON.parse(atob(keyBase));

		let key = await window.crypto.subtle.importKey("jwk", keyJWK, { name: "AES-GCM" }, true, [
			"decrypt",
			"encrypt",
		]);

		setKey(key);
		setId(utxo);
		setMessageCrypted(messageBase);
		setHash(atob(messageBase));

		let message = atob(messageBase);

		console.log(message);

		let message_encrypted = await encrypt(message, key);

		//console.log(await sha256(message_encrypted));

		setRealHash(await sha256(message_encrypted));

		//console.log(encodedStringBtoA);

		fetchAddress(utxo);
	}, []);

	function CustomDisplayPolygon() {
		return (
			<>
				<hr className="solid"></hr>

				<div className="oui">
					{/* <p className="leading-10 font-bold text-3xl mb-6">Transaction Details</p>
				<hr className="solid"></hr>
				<div className="flex">
				<div className="w-1/2 leading-10">a:</div>
				<div className="leading-10">{address.result}</div>
				</div>
				<hr className="solid"></hr>
				<div className="flex">
				<div className="w-1/2 leading-10">Transaction id:</div>
				<div className="leading-10">{address.id}</div>
				</div>
			<hr className="solid"></hr> */}
					{address.id}
				</div>
			</>
		);
	}

	function CustomDisplay2() {
		// console.log("IMPORTANT");
		console.log(window.location.search.substring(1).split("&").join("=").split("="));
		const elemURL = window.location.search.substring(1).split("&").join("=").split("=");

		return (
			<div className="oui">
				<p className="leading-10 font-bold text-3xl mb-6">URL Content</p>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Key:</div>
					<div className="leading-10">{elemURL[1]}</div>
				</div>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Message Crypted:</div>
					<div className="leading-10">{messageCrypted}</div>
				</div>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Transaction Hash:</div>
					<div className="leading-10">{id}</div>
				</div>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Message Input:</div>
					<div className="leading-10"></div>
				</div>
			</div>
		);
	}

	function CustomDisplay3() {
		// console.log("IMPORTANT");
		console.log(window.location.search.substring(1).split("&").join("=").split("="));
		const elemURL = window.location.search.substring(1).split("&").join("=").split("=");

		return (
			<div className="oui">
				<p className="leading-10 font-bold text-3xl mb-6">PolygonScan:</p>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Is message valid:</div>
					<div className="leading-10">{dianee.includes(realhash) ? "YES" : "NO"}</div>
				</div>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Block Hash:</div>
					<div className="leading-10">{address.result.blockHash}</div>
				</div>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Transaction Hash:</div>
					<div className="leading-10">{address.result.hash}</div>
				</div>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Transaction Hash:</div>
					<div className="leading-10">{address.result.v ? "VALID" : "NOT VALID"}</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{haveInput ? CustomDisplay3() : null}
			{CustomDisplay2()}
			<div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
				<div>
					<form onSubmit={handleSubmit}>
						<div className="form-control">
							<div className="relative">
								<input
									type="text"
									className="w-full bg-gray-200 input input-lg text-black"
									placeholder="Message"
									value={messageCrypted}
									onChange={handleChangeHash}
								/>
								{/* <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
									Go
								</button> */}
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
				<div>
					<form onSubmit={handleSubmit}>
						<div className="form-control">
							<div className="relative">
								<input
									type="text"
									className="w-full bg-gray-200 input input-lg text-black"
									placeholder="Transaction Hash"
									value={id}
									onChange={handleChangeId}
								/>
								{/* <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
									Go
								</button> */}
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
				<div>
					<form onSubmit={(handleSubmit, display)}>
						<div className="form-control">
							<div className="relative">
								<input
									type="text"
									className="w-full pr-40 bg-gray-200 input input-lg text-black"
									placeholder="Key"
									value={key}
									onChange={handleChangeKey}
								/>
								<button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
									Go
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			{/* <UserResults />
			<h1 className="text-6xl">Welcome</h1>
			{process.env.REACT_APP_GITHUB_URL} */}
			{/* {CustomDisplayPolygon()} */}
		</>
	);
}

export default Home;
