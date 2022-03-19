import UserResults from "../components/users/UserResults";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import generatekeypair from "../components/layout/crypto/generateKeyPair";
import UserItem from "../components/users/UserItem";

function Home() {
	const [hash, setHash] = useState("");
	const [key, setKey] = useState("");
	const [keyPair, setKeyPair] = useState(null);

	const handleChangeHash = (e) => setHash(e.target.value);
	const handleChangeKey = (e) => setKey(e.target.value);

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
	};

	function displayJson(JSON) {
		JSON.stringify({ foo: "sample", bar: "sample" }, null, 4);
	}

	const handleGenerateClick = async () => {
		setKeyPair(await generatekeypair());
	};

	const display = async (e) => {
		e.preventDefault();

		console.log(keyPair);
		console.log(keyPair.publicKeyJwk);
		console.log(keyPair.privateKeyJwk);
		console.log(JSON.stringify(keyPair, null, 4));
		console.log();
	};

	useEffect(() => {
		// const [publicKeyJwk, privateKeyJwk] = generatekeypair();
		// console.log(publicKeyJwk)
		// console.log(privateKeyJwk)
		handleGenerateClick();
	}, []);

	function CustomDisplay() {
		return JSON.stringify(keyPair, null, 4);
	}

	function CustomDisplay2() {
		// console.log("IMPORTANT");
		console.log(window.location.search.substring(1).split("&").join("=").split("="));
		const elemURL = window.location.search.substring(1).split("&").join("=").split("=");
		return (
			<div className="oui">
				<p className="leading-10 font-bold text-3xl mb-6">URL Content:</p>
				<hr class="solid"></hr>
				<div className="flex">
					<div className="w-1/2 leading-10">{elemURL[0]}:</div>
					<div className="leading-10">{elemURL[1]}</div>
				</div>
				<hr class="solid"></hr>
				<div className="flex">
					<div className="w-1/2 leading-10">{elemURL[2]}:</div>
					<div className="leading-10">{elemURL[3]}</div>
				</div>
				<hr class="solid"></hr>
				<div className="flex">
					<div className="w-1/2 leading-10">{elemURL[4]}:</div>
					<div className="leading-10">{elemURL[5]}</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
				<div>
					<form onSubmit={handleSubmit}>
						<div className="form-control">
							<div className="relative">
								<input
									type="text"
									className="w-full pr-40 bg-gray-200 input input-lg text-black"
									placeholder="Hash"
									value={hash}
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
			{/* {keyPair ? JSON.stringify(keyPair, null, 4) : null} */}
			{/* {keyPair ? CustomDisplay() : null} */}
			{keyPair ? CustomDisplay2() : null}
		</>
	);
}

export default Home;
