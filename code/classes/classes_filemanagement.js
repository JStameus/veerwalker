class FileManager {
    loadFile(fileURL, data) {
        fetch(fileURL).then(response => response.json()).then(json => {data = json});
        //Why doesn't this work? :(
    }
}