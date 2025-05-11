const URL = "https://jobaia-green.vercel.app/applications/JobPost/";

const GetApplicantsFromJob = async (setloading, setError, setGetApplicantsFromJob, id) => {
    setloading(true)
    try {
        const response = await fetch(`${URL}${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.ok) {
            setloading(false);
            setGetApplicantsFromJob(result.data)
        } else {
            if (response.status == 404) {
                setError(result.message)
                setloading(false);
            } else if (response.status == 500) {
                console.log(result.message);
                setError(result.message)
                setloading(false);
            }
            setloading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setloading(false)
    }
}
export default GetApplicantsFromJob;