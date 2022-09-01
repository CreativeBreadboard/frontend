import {useEffect, useState} from 'react'
import {Button} from '../components/Button.js'
import { Dropdown } from '../components/Dropdown.js';
import Simple from '../components/Simple.js'
import Title from '../components/Title.js'
import TitleBorder from '../components/TitleBorder.js'

import { getListData } from '../util/util.js'

function download(url) {
    var a = document.createElement('a');
    a.href = url;
    console.log(a.href);
    a.download = "circuit_draw.jpg";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function Viewer(props) {
    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <Title title="결과" description="계산된 결과와 회로도 입니다. " />

            <TitleBorder title="정보" />
            
            <div>
                <img src={props.dia_circuit} alt="Circuit"></img>
            </div>

            <TitleBorder title="전압 / 전류" />

            <div class="flex items-center justify-between mt-4">
                <Dropdown list={props.list_current}></Dropdown>
                <Dropdown list={props.list_voltage}></Dropdown>
            </div>

            <Title title={props.r_th + "Ω"} description="합성저항 계산 결과입니다. " />

            <Button text="Spice 코드 다운로드" onClick={x => download(props.spice)}/>
            <Button text="회로도 다운로드" onClick={x => download(props.dia_circuit)}/>
        </div>
    )
}

function getResult(URL, func_setRTH, func_setCurrent, func_setVoltage) {
    fetch(URL)
    .then(x => (
        x.json()
    ))
    .then(x => {
        func_setRTH(x.circuit_analysis.r_th);
        func_setCurrent([x.circuit_analysis.node_current]);

        var list_voltage = [];
        JSON.parse(x.circuit_analysis.node_voltage).map((element, index) => {
            if(element.length === 1) list_voltage.push("#" + (index + 1) + " node " + element);
            else list_voltage.push("#" + (index + 1) + " node " + element.join(", "));
        });

        func_setVoltage(list_voltage);
    })
    .catch(error => 
        console.log('error', error)
    );
}

export function Result(props) {
    console.log(props.resultData);
    const [_, result_anno] = getListData(props.resultData);
    
    var img_circuit = "data:image/jpg;base64, " + props.resultData.transformedImg;

    var [r_th, setRTH] = useState(0);
    var [list_current, setCurrentList] = useState([]);
    var [list_voltage, setVoltageList] = useState([]);

    useEffect(x => {
        getResult(props.BASE_URL + "calc", setRTH, setCurrentList, setVoltageList);
    }, []);

    return (
        <div class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl m-5 w-full">
            <div class="hidden bg-cover lg:block lg:w-1/2">
                <Simple src_image={img_circuit} markers={result_anno} />
            </div>
            <Viewer setContents={props.setContents} 
                    dia_circuit={props.BASE_URL + "draw"} 
                    spice={props.BASE_URL + "spice"}
                    r_th={r_th}
                    list_current={list_current}
                    list_voltage={list_voltage}
            />
        </div>
    );
}