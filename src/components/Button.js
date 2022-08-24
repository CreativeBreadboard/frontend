export function Button(props) {
    if(props.icon) {
        return (
            <button type="button" class="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                {props.icon && <img src={props.icon} alt="icon" style={{"fill": "rgb(244,244,244)"}} height="20px"></img>}
            </button>
        );
    }

    return (
        <button type="button" class="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            {props.text}
        </button>
    );
}