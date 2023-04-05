let itocol = {
    1:"#FF0303",
    2:"#FF6000",
    3:"#C7F5FF",
    4:"#ffc0cb",
    5:"#FFD93D",
}
function getRandomColor() {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomHex.padStart(6, "0");
  }

export const getColor = (index) =>{
    if(!itocol[index]){
        itocol[index] = getRandomColor()
    }
    return itocol[index];
}