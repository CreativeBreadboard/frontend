
/*
 * id: 입력 받는 컴포넌트 ID. 
 * type: 입력 타입. 
 * title: 입력 타이틀. 
 * description: 설명. 
 */
export function Input(props) {
    return (
        <div class="mt-4">
            <div class="flex justify-between">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="loggingPassword">{props.title}</label>
                <label href="/" class="text-xs text-gray-500 dark:text-gray-300 hover:underline">{props.description}</label>
            </div>

            <input id={props.id}
                    class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 
                            dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 
                            focus:outline-none focus:ring focus:ring-blue-300" 
                    type={props.type}
                    value={props.value}
                    disabled={props.disabled}/>
        </div>
    );
}