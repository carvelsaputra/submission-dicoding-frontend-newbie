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
  dataBuku.penulis = document.getElementById("inputBookAuthor").value;
  dataBuku.tahun = document.getElementById("inputBookYear").value;
  dataBuku.statusBaca = document.getElementById("inputBookIsComplete").value;
  if (!checkForStorage()) {
    return alert("Browser tidak support Web Storage !");
  }
  let list = [];
  if (localStorage.getItem(storageKey) === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem(storageKey));
    console.log(list);
  }
  list.unshift(dataBuku);
  if (list.length > 5) {
    list.pop();
  }
  localStorage.setItem(storageKey, JSON.stringify(list));
}
function getBookList() {
  if (!checkForStorage()) {
    return alert("Browser tidak support Web Storage !");
  }
}
