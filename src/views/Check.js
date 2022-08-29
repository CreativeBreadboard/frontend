import { useState } from 'react';
import Annotation from 'react-image-annotation'
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Simple from '../components/Simple';
import Title from '../components/Title';
import TitleBorder from '../components/TitleBorder';

function Edit(props) {
    var values = props.data[props.edit_index];
    console.log(values);

    var [name, setName] = useState(values.name);
    var [type, setType] = useState(values.type);
    var [start_pin, setStartPin] = useState(values.start_pin);
    var [end_pin, setEndPin] = useState(values.end_pin);
    var [reg, setReg] = useState(values.reg);

    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <Title title="수정" description="해당 컴포넌트의 정보를 수정해주세요. "/>

            <TitleBorder title="정보" />

            <Input title="이름" type="text" value={name} setValue={setName}/>
            <Input title="종류" type="text" value={type} setValue={setType}/>
            <Input title="시작핀" type="text" value={start_pin} setValue={setStartPin}/>
            <Input title="끝핀" type="text" value={end_pin} setValue={setEndPin}/>
            <Input title="저항값" type="number" value={reg === -1 ? 0 : reg} disabled={reg === -1} setValue={setReg}/>

            <Button text="삭제" onClick={x => props.setContents("check")}/>
            <Button text="확인" onClick={x => {
                values = props.data;
                values[props.edit_index].name = name;
                values[props.edit_index].type = type;
                values[props.edit_index].start_pin = start_pin;
                values[props.edit_index].end_pin = end_pin;
                values[props.edit_index].reg = reg;

                props.func_setData(values);
                props.setIsEdit(false);
            }}/>
        </div>
    )
}

function List(props) {
    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <Title title="컴포넌트" description="검출된 컴포넌트이에요. 확인해주세요. "/>

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
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            저항값
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((val, index) => {
                        return (
                            <tr class="text-gray-700 " onClick={x => {props.func_setEditIndex(index); props.setIsEdit(true);}}>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.name}</td>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.type}</td>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.start_pin}</td>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.end_pin}</td>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.reg === -1 ? "-" : val.reg}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Button text="다음" onClick={x => props.setContents("result")}/>
        </div>
    )
}

export function Check(props) {
    var [markers, setMarkers] = useState([]);
    var [url_image, setImageURL] = useState("https://via.placeholder.com/330x600");
    var [isEdit, setIsEdit] = useState(false);
    var [data, setData] = useState([{"name": "L1", "type": "Line", "start_pin": "A2", "end_pin": "A4", "reg": -1},
                                    {"name": "R1", "type": "Register", "start_pin": "B2", "end_pin": "B4", "reg": 320},]);
    var [edit_index, setEditIndex] = useState(-1);
    var [annos, setAnnotations] = useState([])

    return (
        <div class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl m-5 w-full">
            <div class="hidden bg-cover lg:block lg:w-1/2">
                <Simple src_image={url_image}></Simple>
            </div>
            {!isEdit && <List setIsEdit={setIsEdit} data={data} func_setEditIndex={setEditIndex} setContents={props.setContents}></List>}
            {isEdit && <Edit setIsEdit={setIsEdit} data={data} edit_index={edit_index} func_setData={setData}></Edit>}
        </div>
    );
}