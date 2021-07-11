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
    article.classList.add("book_item");
    let action = document.createElement("div");
    action.classList.add("action");

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("red", "btn_action");
    deleteBtn.addEventListener("click", function () {
      deleteBook(book.id);
    });
    deleteBtn.innerText = "Hapus buku";

    let editBtn = document.createElement("button");
    editBtn.classList.add("green", "btn_action");
    editBtn.addEventListener("click", function () {
      changeStatus(book.id);
    });

    let title = document.createElement("h3");
    title.innerText = book.judul;
    let writer = document.createElement("p");
    writer.innerText = `Penulis : ${book.penulis}`;
    let year = document.createElement("p");
    year.innerText = `Tahun : ${book.tahun}`;

    article.append(title);
    article.append(writer);
    article.append(year);
    article.appendChild(action);

    action.appendChild(editBtn);
    action.appendChild(deleteBtn);

    if (!book.statusBaca) {
      editBtn.innerText = "Selesai Dibaca";
      unCompleteBook.appendChild(article);
    } else {
      editBtn.innerText = "Belum Selesai dibaca";
      completeBook.appendChild(article);
    }
  }
}

function changeStatus(id) {
  let books = getBookList();
  Array.from(books).forEach((book) => {
    if (book.id == id) {
      book.statusBaca = !book.statusBaca;
    }
  });
  localStorage.setItem(storageKey, JSON.stringify(books));
  renderBookList();
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
