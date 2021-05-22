let dataBuku = {
  id: "",
  judul: "",
  penulis: "",
  tahun: "",
  statusBaca: false,
};

const storageKey = "STORAGE_KEY";
const submitAction = document.getElementById("inputBook");
function checkForStorage() {
  return typeof Storage !== "undefined";
}
function storeBook() {
  dataBuku.id = new Date().getTime();
  dataBuku.judul = document.getElementById("inputBookTitle").value;
  dataBukupenulis = document.getElementById("inputBookAuthor").value;
  dataBukutahun = document.getElementById("inputBookYear").value;
  dataBukustatusBaca = document.getElementById("inputBookIsComplete").value;
  if (checkForStorage()) {
    let list = [];
    if (localStorage.getItem(storageKey) === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem(storageKey));
    }
    localStorage.setItem(storageKey, JSON.stringify(dataBuku));
  }
}
