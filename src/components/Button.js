export function Button(props) {
    return (
        <div class="mt-8 place-self-end">
            <button class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform 
                        bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    onClick={x => props.onClick(x)}>
                {props.text}
            </button>
        </div>
    );
}