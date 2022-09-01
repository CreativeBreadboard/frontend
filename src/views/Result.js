import {useState} from 'react'
import {Button} from '../components/Button.js'
import { Dropdown } from '../components/Dropdown.js';
import Simple from '../components/Simple.js'
import Title from '../components/Title.js'
import TitleBorder from '../components/TitleBorder.js'

function getNodeList() {

}

function calcValue() {
    return "0";
}

function Viewer(props) {
    var list = ["asd", "gfg", "sdfghksdf", 'ashkasd'];
    var [calcValue, setCalcValue] = useState("40A");

    // setCalcValue(calcValue());

    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <Title title="결과" description="계산된 결과와 회로도 입니다. " />

            <TitleBorder title="정보" />
            
            <div>
                <img src={props.dia_circuit}></img>
            </div>

            <div class="flex items-center justify-between mt-4">
                <Dropdown list={list}></Dropdown>
                <Dropdown list={list}></Dropdown>
            </div>

            <Title title={calcValue} description="계산된 결과 입니다. " />

            <Button text="회로도 다운로드" onClick={x => props.setContents(false)}/>
            <Button text="확인" onClick={x => props.setContents(false)}/>
        </div>
    )
}

export function Result(props) {
    var [img_circuit, setCircuitImage] = useState(props.resultData.transformedImg);
    var [dia_circuit, setCircuitDiagram] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/4_bit_counter.svg/640px-4_bit_counter.svg.png");

    return (
        <div class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl m-5 w-full">
            <div class="hidden bg-cover lg:block lg:w-1/2">
                <Simple src_image={img_circuit}></Simple>
            </div>
            <Viewer setContents={props.setContents} dia_circuit={dia_circuit}></Viewer>
        </div>
    );
}