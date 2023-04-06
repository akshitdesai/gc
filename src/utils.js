let itocol = {
    1:"#FFA500",
    2:"#97C30A",
    3:"#1FBED6",
    4:"#ffc0cb",
    5:"#FFFF00",
    6:"#00FF00",
    7:"#808080",
    8:"#FF0303",
    9:"#9400D3",
    10:"#008080"
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