function getPinPoint(pin, type, width, height) {
    if(type === "start")
        return ({
            "data": {"text": pin.end, "id": Math.random()},
            "geometry": {
                "type": "POINT",

                "x": pin.end_coord[0] / width * 100,
                "y": pin.end_coord[1] / height * 100,

                "width": 5,
                "height": 5
            }
        });
    else 
        return ({
            "data": {"text": pin.start, "id": Math.random()},
            "geometry": {
                "type": "POINT",

                "x": pin.start_coord[0] / width * 100,
                "y": pin.start_coord[1] / height * 100,

                "width": 5,
                "height": 5
            }
        });
}

export function getListData(data) {
    const components = data.components;
    var [width, height] = data.basePoint[2];
    width += 200;
    height += 200;

    var list_data = [];
    var list_annotation = [];

    for(var key in components.Line) {
        list_data.push({
            "name": components.Line[key].name, 
            "type": "Line", 
            "start_pin": components.Line[key].start, 
            "end_pin": components.Line[key].end, 
            "reg": -1}
        );

        list_annotation.push({
            "data": {"text": components.Line[key].name, "id": Math.random()},
            "geometry": {
                "type": "RECTANGLE",

                "x": components.Line[key].areaStart[0] / width * 100,
                "y": components.Line[key].areaStart[1] / height * 100,

                "width": (components.Line[key].areaEnd[0] - components.Line[key].areaStart[0]) / width * 100,
                "height": (components.Line[key].areaEnd[1] - components.Line[key].areaStart[1]) / height * 100
            }
        });

        list_annotation.push(getPinPoint(components.Line[key], "start", width, height));
        list_annotation.push(getPinPoint(components.Line[key], "end", width, height));
    }

    for(key in components.Resistor) {
        list_data.push({
            "name": components.Resistor[key].name, 
            "type": "Resistor", 
            "start_pin": components.Resistor[key].start, 
            "end_pin": components.Resistor[key].end, 
            "reg": components.Resistor[key].value
        });

        list_annotation.push({
            "data": {"text": components.Resistor[key].name, "id": Math.random()},
            "geometry": {
                "type": "RECTANGLE",

                "x": components.Resistor[key].areaStart[0] / width * 100,
                "y": components.Resistor[key].areaStart[1] / height * 100,

                "width": (components.Resistor[key].areaEnd[0] - components.Resistor[key].areaStart[0]) / width * 100,
                "height": (components.Resistor[key].areaEnd[1] - components.Resistor[key].areaStart[1]) / height * 100
            }
        });
        
        list_annotation.push(getPinPoint(components.Resistor[key], "start", width, height));
        list_annotation.push(getPinPoint(components.Resistor[key], "end", width, height));
    }

    console.log(list_data, list_annotation);

    return [list_data, list_annotation];
}

export async function list2data(list_components, resultData) {
    var data = {};
    var list_resi = {};
    var list_line = {};

    await list_components.forEach(async element => {
        var cord_start = [];
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://pengpark.com:7080/pinmap?pin="+element.start_pin, requestOptions)
        .then(response => response.json())
        .then(result => {
            cord_start = result;

            if(element.name.includes("R")) {
                fetch("http://pengpark.com:7080/pinmap?pin="+element.end_pin, requestOptions)
                .then(response => response.json())
                .then(result => {
                    list_resi[element.name] = {
                        "name": element.name, 
                        "class": element.type,
                        "start": element.start_pin,
                        "end": element.end_pin,
                        "value": element.reg,
                        "start_coord": cord_start.coord,
                        "end_coord": result.coord,
                        "areaStart": resultData.components.Resistor[element.name].areaStart,
                        "areaEnd": resultData.components.Resistor[element.name].areaEnd
                    };
                })
                .catch(error => console.log('error', error));
            }
            else {
                fetch("http://pengpark.com:7080/pinmap?pin="+element.end_pin, requestOptions)
                .then(response => response.json())
                .then(result => {
                    list_line[element.name] = {
                        "name": element.name, 
                        "class": element.type,
                        "start": element.start_pin,
                        "end": element.end_pin,
                        "start_coord": cord_start.coord,
                        "end_coord": result.coord,
                        "areaStart": resultData.components.Line[element.name].areaStart,
                        "areaEnd": resultData.components.Line[element.name].areaEnd
                    }
                })
                .catch(error => console.log('error', error));
            }})
            .catch(error => console.log('error', error));
    });

    data["Resistor"] = list_resi;
    data["Line"] = list_line;
    data["Unknown"] = [];
    
    return data;
}