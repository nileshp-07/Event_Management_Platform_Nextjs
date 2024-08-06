const Layout = ({children} : {
    children : React.ReactNode
}) => {
    return (
        <div className="w-full h-screen flex-center bg-primary-50">
            {children}
        </div>
    )
}

export default Layout