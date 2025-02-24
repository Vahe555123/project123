export const HomePage = () => {
    return (
        <>
            {localStorage.getItem("token") ? 
            <>PROFILE</>
            :
            <>LOGIN</>
            }
        </>
    )
}