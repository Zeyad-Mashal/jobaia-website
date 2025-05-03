const URL = "https://jobaia-green.vercel.app/JobPosting/paginated?page=";

const JobListApi = async (setloading, setError, setAllJobs, page, setCurrentPage) => {
    setloading(true)
    try {
        const response = await fetch(`${URL}${page}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.ok) {  // 200, 201, 202
            setAllJobs(result.data)
            setCurrentPage(result.currentPage)
            setloading(false);
        } else {
            if (response.status == 401) {
                setError(result.err)
                setloading(false);
            } else if (response.status == 500) {
                console.log(result.err);
                setError(result.err)
                setloading(false);
            }
            setloading(false)
        }
    } catch (error) {
        setError('An error occurred');
        setloading(false)
    }
}
export default JobListApi;