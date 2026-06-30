// LOGIN
function login(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
  .then(()=>{
    document.getElementById("loginBox").style.display="none";
    document.getElementById("app").style.display="block";
    loadGallery();
  })
  .catch(e=>alert(e.message));
}

// REGISTER
function register(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, pass)
  .then(()=>alert("Akun dibuat!"))
  .catch(e=>alert(e.message));
}

// LOGOUT
function logout(){
  auth.signOut();
  location.reload();
}

// UPLOAD FOTO
async function upload(){
  const file = document.getElementById("file").files[0];
  const nama = document.getElementById("nama").value;
  const user = auth.currentUser;

  if(!file || !nama) return alert("Isi lengkap!");

  const ref = storage.ref("foto/"+Date.now()+file.name);
  await ref.put(file);
  const url = await ref.getDownloadURL();

  await db.collection("gallery").add({
    nama,
    url,
    uid: user.uid,
    time: Date.now()
  });

  loadGallery();
}

// LOAD GALLERY
function loadGallery(){
  db.collection("gallery").orderBy("time","desc")
  .onSnapshot(snap=>{
    let html="";
    snap.forEach(doc=>{
      let d=doc.data();
      html+=`
      <div class="item">
        <img src="${d.url}">
        <h3>${d.nama}</h3>
        <button onclick="hapus('${doc.id}','${d.uid}')">Hapus</button>
        <a href="${d.url}" download>Download</a>
      </div>`;
    });
    document.getElementById("gallery").innerHTML=html;
  });
}

// HAPUS FOTO
function hapus(id,uid){
  if(auth.currentUser.uid !== uid){
    return alert("Bukan pemilik!");
  }
  db.collection("gallery").doc(id).delete();
}
