const storageKey = "STORAGE_KEY";
const submitAction = document.getElementById("inputBook");

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function storeBook(dataBuku) {
  if (!checkForStorage()) {
    return alert("Browser tidak support Web Storage !");
  }
  let list = [];
  if (localStorage.getItem(storageKey) === null) {
    list = [];
  } else {
    list = JSON.parse(localStorage.getItem(storageKey));
  }
  list.unshift(dataBuku);
  if (list.length > 5) {
    list.pop();
  }
  localStorage.setItem(storageKey, JSON.stringify(list));
}

function getBookList() {
  if (!checkForStorage()) {
    return [];
  }
  return JSON.parse(localStorage.getItem(storageKey));
}

function renderBookList() {
  const books = getBookList();
  const unCompleteBook = document.querySelector("#incompleteBookshelfList");
  const completeBook = document.querySelector("#completeBookshelfList");

  unCompleteBook.innerHTML = "";
  completeBook.innerHTML = "";

  for (let book of books) {
    let article = document.createElement("article");
    article.innerHTML = `
    <h3> ${book.judul} </h3>
    <p> Penulis : ${book.penulis} </p>
    <p> Tahun : ${book.tahun}</p>
    <div class="action">
      <button class="green" id="edit">Selesai dibaca</button>
      <button class="red" onclick="deleteBook(${book.id});">Hapus buku</button>
    </div>
    `;
    if (!book.statusBaca) {
      unCompleteBook.appendChild(article);
    } else {
      completeBook.appendChild(article);
    }
  }
}

function deleteBook(id) {
  let data = getBookList();
  const book = data.findIndex((data) => data.id == id);
  data.splice(book, 1);
  localStorage.setItem(storageKey, JSON.stringify(data));
  renderBookList();
}

let onSubmit = document.getElementById("bookSubmit");

onSubmit.addEventListener("click", function (event) {
  const dataBuku = {
    id: "",
    judul: "",
    penulis: "",
    tahun: "",
    statusBaca: false,
  };

  dataBuku.id = new Date().getTime();
  dataBuku.judul = document.getElementById("inputBookTitle").value;
  dataBuku.penulis = document.getElementById("inputBookAuthor").value;
  dataBuku.tahun = document.getElementById("inputBookYear").value;
  dataBuku.statusBaca = document.getElementById("inputBookIsComplete").checked;
  storeBook(dataBuku);
  renderBookList();
});

window.onload = renderBookList();
