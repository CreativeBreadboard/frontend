import { useState } from 'react';
import ImageMarker from 'react-image-marker';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import Title from '../components/Title';
import TitleBorder from '../components/TitleBorder';

function markers2points(markers) {
    var points = [];

    markers.forEach(element => {
        points.push([element.left, element.top]);
    });

    return points;
}

function uploadCircuitInfo(URL, file, volt, markers, setContents, setResultData) {
    const points = markers2points(markers);
    console.log(points);
    const points_data = {"points": points, "scale": 2.5, "voltage": volt};
    
    var data = new FormData();
    data.append("circuitImage", file);
    data.append("points", JSON.stringify(points_data));

    fetch(URL, {
        method: "post",
        body: data
    }).then(x => 
        x.json()
    ).then(x => {
        console.log(x);
        setResultData(x);
        setContents("check");
    }).catch(error => 
        console.log('error', error)
    );
}

export function Upload(props) {
    var [volt, setVolt] = useState(0);
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
                <Title title="업로드" description="아래의 정보를 입력해주세요. " />

                <TitleBorder title="정보" />

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

                <Input title="전압" description="V 단위로 입력해주세요. " type="number" setValue={setVolt}/>

                <Button text="다음" onClick={x => {
                        uploadCircuitInfo(props.BASE_URL + "image/1", document.getElementById("file").files[0], volt, markers, props.setContents, props.setResultData);
                    }}
                />
            </div>
        </div>
    );
}