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
  dataBuku.statusBaca = document.getElementById("inputBookIsComplete").checked;
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

// function getBookList() {
//   if (!checkForStorage()) {
//     return [];
//   }
//   return JSON.parse(localStorage.getItem(storageKey));
// }

// function renderBookList() {
//   const books = getBookList();
//   console.log(books);
//   const unCompleteBook = document.getElementById("#incompleteBookshelfList");
//   const completeBook = document.getElementById("#completeBookshelfList");

//   bookList.innerHTML = "";

//   // <h3>Book Title</h3>
//   // <p>Penulis: John Doe</p>
//   // <p>Tahun: 2002</p>

//   // <div class="action">
//   //     <button class="green">Selesai dibaca</button>
//   //     <button class="red">Hapus buku</button>
//   // </div>

//   for (let book of books) {
//     let article = document.createElement("article");
//     article.innerHTML = `
//     <h3> ${book.nama} </h3>
//     <p> Penulis : ${book.penulis} </p>
//     <p> Tahun : ${book.tahun}</p>
//     `;
//     // if(book.)
//     // bookList.appendChild(article);
//   }
// }
