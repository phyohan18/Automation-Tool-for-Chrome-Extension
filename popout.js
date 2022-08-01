
chrome.runtime.onMessage.addListener((msg)=>{
    if (msg.command == 'run-complete'){
        document.querySelector('textarea').value = JSON.stringify(msg.data)
        document.querySelector('textarea').style.display = 'block'
        alert('commands have been run')
    }
})

// Adding an event listener on Add Command button
document.querySelector('.new-command').addEventListener('click', function(){
    let newItem = `<div class="command-item">
    <select>
        <option value="wait">Wait</option>
        <option value="click">Click</option>
        <option value="enter">Enter Value</option>
        <option value="save">Save Value</option>
    </select>
    <input class="value-1" placeholder="200ms" />
    <input class="value-2" placeholder="Optional">
</div>`;
    document.querySelector('.commands-list').innerHTML += newItem
})

function createCommandObject() {
    let commandsArr = []
    let commands = document.querySelectorAll('.commands-list .command-item')

    for ( let i = 0; i < commands.length; i++) {
        let itemObj = {}
        itemObj.type = commands[i].querySelector('select').value
        itemObj.one = commands[i].querySelector('.value-1').value
        itemObj.two = commands[i].querySelector('.value-2').value
        commandsArr.push(itemObj)
    }


    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        //take in array of all tabs
        //check tab we're currently on (first tab)
        let activeTab = tabs[0];
        let obj = commandsArr;
        chrome.tabs.sendMessage(activeTab.id, {command: "runCommands", data: obj})
    })
}


document.querySelector('.run-command').addEventListener('click', function(){
    createCommandObject()
})
