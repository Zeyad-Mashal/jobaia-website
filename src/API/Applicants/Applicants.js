const URL = "https://jobaia-green.vercel.app/companyName/";

const Applicants = async (setloading, setError, setApplicants, id) => {
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
            setApplicants(result)
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
export default Applicants;