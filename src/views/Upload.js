import { useState } from 'react';
import ImageMarker from 'react-image-marker';

export function Upload(props) {
    var [markers, setMarkers] = useState([]);
    var [url_image, setImageURL] = useState("https://via.placeholder.com/330x600");

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
            
            <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-white">업로드</h2>
                <p class="text-xl text-center text-gray-600 dark:text-gray-200">아래의 정보를 입력해주세요. </p>

                <div class="flex items-center justify-between mt-4">
                    <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                    <a href="/" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">정보</a>

                    <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

                <div class="mt-4">
                    <div class="flex justify-between">
                        <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">이미지</label>
                        <a href="/" class="text-xs text-gray-500 dark:text-gray-300 hover:underline">이미지를 선택 후 영역을 지정해 주세요. </a>
                    </div>
                    <form action="upload" id="uploadForm" method="post" enctype="multipart/form-data">
                        <input type="file" name="file" id="file" 
                                style={{display: "none"}} accept="image/png, image/jpeg"
                                onChange={
                                    event => {
                                        event.preventDefault();
                                        let reader = new FileReader();
                                        let file = event.target.files[0];
                                        reader.onloadend = () => {
                                            setImageURL(reader.result);
                                        }
                                        reader.readAsDataURL(file);
                                    }
                                }/>
                    </form>
                    <button class="w-full px-4 py-2 tracking-wide text-white transition-colors 
                                    duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            onClick={
                                x => {
                                    document.getElementById("file").click();
                                }
                            }>
                        이미지 선택
                    </button>
                </div>

                <div class="mt-4">
                    <div class="flex justify-between">
                        <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="loggingPassword">전압</label>
                        <a href="/" class="text-xs text-gray-500 dark:text-gray-300 hover:underline">V 단위로 입력해주세요. </a>
                    </div>

                    <input id="loggingPassword" 
                            class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 
                                    dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" 
                            type="number"/>
                </div>

                <div class="mt-8 place-self-end">
                    <button class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform 
                                bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            onClick={x => props.setContents("check")}>
                        다음
                    </button>
                </div>
            </div>
        </div>

    );
}