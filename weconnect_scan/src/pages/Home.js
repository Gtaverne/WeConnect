import UserResults from "../components/users/UserResults";
import { useState, useEffect } from "react";
import generatekeypair from "../components/layout/crypto/generateKeyPair";

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
	};

	useEffect(() => {
		// const [publicKeyJwk, privateKeyJwk] = generatekeypair();
		// console.log(publicKeyJwk)
		// console.log(privateKeyJwk)
		handleGenerateClick();
	}, []);

	const PrettyPrintJson = ({ data }) => (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
	function createMarkup() {
		return { __html: "First &middot; Second" };
	}

	function MyComponent() {
		return <div dangerouslySetInnerHTML={createMarkup()} />;
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
			{keyPair ? JSON.stringify(keyPair, null, 4) : null}
			{keyPair ? MyComponent() : null}
		</>
	);
}
export default Home;
