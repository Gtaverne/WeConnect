import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import encrypt from "../components/layout/crypto/encrypt";

//utxo represente la Transaction Hash

function Home() {
	const [hash, setHash] = useState(""); // ce hash correspond au message
	const [realhash, setRealHash] = useState(""); // ce hash correspond au message

	const [key, setKey] = useState("");
	const [id, setId] = useState("");
	const [dianee, setDianee] = useState("");
	const [messageCrypted, setMessageCrypted] = useState("");
	const [haveInput, setHaveInput] = useState(false);

	const [address, setAddress] = useState("");

	const handleChangeHash = (e) => setHash(e.target.value);
	const handleChangeKey = (e) => setKey(e.target.value);
	const handleChangeId = (e) => setId(e.target.value);

	const [searchParams, setSearchParams] = useSearchParams();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (hash !== "" || key !== "") {
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
		console.log("transaction_list from polygonscan: ", transaction_list);
		console.log(JSON.stringify(transaction_list));

		setAddress(transaction_list);

		const diane = await fetch(`http://167.71.129.58:3000/api/api/${transaction_list.result.input}`, {});

		const diane_response = await diane.json();
		console.log("response from Diane decryption: ", diane_response);
		console.log(JSON.stringify(diane_response));
		setDianee(JSON.stringify(diane_response));
		console.log(diane_response.response[2].value);

		setHaveInput(true);
	};

	const display = async (e) => {
		e.preventDefault();

		console.log("Display");
		console.log(realhash);
		console.log(JSON.parse(dianee).response[2].value);
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

		console.log("messge in base normal: " + message);

		let message_encrypted = await encrypt(message, key);

		//console.log(await sha256(message_encrypted));

		let hash_temp = await sha256(message_encrypted);

		setRealHash(hash_temp);
		console.log(hash_temp);

		fetchAddress(utxo);
	}, []);

	function CustomDisplay2() {
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
		return (
			<div className="oui">
				<p className="leading-10 font-bold text-3xl mb-6">PolygonScan:</p>
				<hr className="solid"></hr>
				<div className="">
					<div className="w-1/2 leading-10">Is message valid:</div>
					<div className="leading-10">{realhash === JSON.parse(dianee).response[2].value ? "YES" : "NO"}</div>
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
		</>
	);
}

export default Home;
