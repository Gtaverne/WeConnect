import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

// https://api-mumbai.polygonscan.com/api?module=account&action=balancemulti&address=0x5A534988535cf27a70e74dFfe299D06486f185B7,0x54bA15efe1b6D886bA4Cd5C5837240675BD0D43a,0x39842a0Fe638cc956b76A49E918c30d818708BA0&tag=latest&apikey=YUFQKP2FWHPDEA9MHHUZ37S4E1Y63VHI13

function UserResults() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [address, setAddress] = useState([]);
	const [loadingAddress, setLoadingAddress] = useState(true);

	useEffect(() => {
		fetchUsers();
		fetchAddress();
	}, []);

	const fetchUsers = async () => {
		const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
			},
		});
		const data = await response.json();

		setUsers(data);
		setLoading(false);
	};

	const fetchAddress = async () => {
		const response = await fetch(`https://api.polygonscan.com/api?module=account&action=txlistinternal&address=0x0f4240D9bD4D3CFCE7aDE7F26415780824958Bc3&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`, {
		});
		const transaction_list = await response.json();
		console.log(transaction_list)

		setAddress(transaction_list);
		setLoadingAddress(false);
	};

	if (!loading) {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{users.map((user, id) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	} else {
		return <Spinner />;
	}
}

export default UserResults;
