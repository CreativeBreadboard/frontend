import { useState } from 'react';
import ImageMarker from 'react-image-marker';

function Edit(props) {
    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-white">수정</h2>
            <p class="text-xl text-center text-gray-600 dark:text-gray-200">해당 컴포넌트의 정보를 수정해주세요. </p>

            <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <a href="/" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">정보</a>

                <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <div class="mt-4">
                <div class="flex justify-between">
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">이름</label>
                </div>
                <input id="loggingPassword" 
                            class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 
                                    dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" 
                            type="text"/>
            </div>

            <div class="mt-4">
                <div class="flex justify-between">
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">종류</label>
                </div>
                <input id="loggingPassword" 
                            class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 
                                    dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" 
                            type="text"/>
            </div>

            <div class="mt-4">
                <div class="flex justify-between">
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">시작핀</label>
                </div>
                <input id="loggingPassword" 
                            class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 
                                    dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" 
                            type="text"/>
            </div>

            <div class="mt-4">
                <div class="flex justify-between">
                    <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">끝핀</label>
                </div>
                <input id="loggingPassword" 
                            class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 
                                    dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" 
                            type="text"/>
            </div>

            <div class="mt-8 place-self-end">
                <button class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform 
                            bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        onClick={x => props.setContents("check")}>
                    삭제
                </button>
            </div>

            <div class="mt-8 place-self-end">
                <button class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform 
                            bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        onClick={x => props.setIsEdit(false)}>
                    확인
                </button>
            </div>
        </div>
    )
}

function List(props) {
    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-white">컴포넌트</h2>
            <p class="text-xl text-center text-gray-600 dark:text-gray-200">검출된 컴포넌트이에요. 확인해주세요. </p>

            <table class="table p-2 bg-white rounded-lg w-full">
                <thead>
                    <tr>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            이름
                        </th>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            종류
                        </th>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            시작핀
                        </th>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            끝핀
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-gray-700 " onClick={x => props.setIsEdit(true)}>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            L1
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            Register
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            F3
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            G3
                        </td>
                    </tr>
                    <tr class="text-gray-700">
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            R2
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            Register
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            A1
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            D3
                        </td>
                    </tr>
                    <tr class="text-gray-700">
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            L3
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            Line
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            F1
                        </td>
                        <td class="border-b-2 p-4 dark:border-dark-5">
                            J2
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export function Check(props) {
    var [markers, setMarkers] = useState([]);
    var [url_image, setImageURL] = useState("https://via.placeholder.com/330x600");
    var [isEdit, setIsEdit] = useState(false);

    return (
        <div class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl m-5 w-full">
            <div class="hidden bg-cover lg:block lg:w-1/2">
                <ImageMarker
                    src={url_image}
                    markers={markers}
                    onAddMarker={(marker) => {
                        if(markers.length === 4) setMarkers([marker]);
                        else setMarkers([...markers, marker])
                    }}
                />
            </div>
            {!isEdit && <List setIsEdit={setIsEdit}></List>}
            {isEdit && <Edit setIsEdit={setIsEdit}></Edit>}
        </div>

    );
}