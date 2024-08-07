

export const makeGetAllRequest = async(apiURL, setFunction) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", apiURL, true);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const data = JSON.parse(xhttp.responseText);

            if (apiURL == "http://localhost:8000/Timeline/") {
                setFunction(data);

            }
            else {
            setFunction(data.Timeline);
            }
        }

        else {
            console.log("Error fetching data: ", xhttp.statusText);
        }
    };

    xhttp.send();
}




export const makePutRequest = (apiURL, updateData, callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", apiURL, true);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const data = JSON.parse(xhttp.responseText);
            callback(data);
        } else if (xhttp.readyState === 4) {
            console.log("Error updating data: ", xhttp.statusText);
        }
    };

    xhttp.send(updateData);
};






