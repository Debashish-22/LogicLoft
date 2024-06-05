const verifyServer = async(token: any) => {
    try {

        const URI = `${process.env.SERVER_API}/auth/auth-user`;

        const response = await fetch(URI, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        console.log(error)
    }
}

export default verifyServer;