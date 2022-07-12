export interface SearchIconProps {}

function SearchIcon(props: SearchIconProps) {
    const {} = props;

    return (
        <>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g transform="translate(-40)">
                        <rect style={{ opacity: 0 }} width="20" height="20" transform="translate(60 20) rotate(180)" />
                        <path
                            className="b"
                            style={{ fill: '#6a7684' }}
                            d="M58.85,17.44l-3.978-3.978a3.037,3.037,0,0,0-.429-.356l-1.011-.691h0a7.037,7.037,0,1,0-1.065,1.052l0,0,.748,1.024a3.125,3.125,0,0,0,.3.354l4.02,4a.5.5,0,0,0,.71,0l.7-.7A.5.5,0,0,0,58.85,17.44ZM48,13a5,5,0,1,1,5-5A5.006,5.006,0,0,1,48,13Z"
                        />
                    </g>
                </svg>
            </div>

            <style jsx>{``}</style>
        </>
    );
}

export default SearchIcon;
