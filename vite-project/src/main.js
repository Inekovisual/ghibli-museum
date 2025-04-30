import "./style.css";
import { createClient } from "@supabase/supabase-js";

class Home {
  constructor() {
    this.initSupabase();
    this.getData();
  }

  // Create a single supabase client for interacting with your database
  initSupabase() {
    this.supabase = createClient(
      "https://mywwgeczkqrkuexbzqfa.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d3dnZWN6a3Fya3VleGJ6cWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTkxOTAsImV4cCI6MjA2MTQ5NTE5MH0.ljOOmpAF9LxhlAs_rAub9sutpwrCsa1RtaFIxxj_Qp0"
    );
  }

  deleteElement(e) {
    console.log(e.target);
    // get Attribute
    const card = e.target.closest(".film");
    const id = card.getAttribute("data-id");

    // Fonction delete Supabase
    this.supabase.from("Film").delete().eq("id", id);
  }

  async getData() {
    const valeurDeRetour = await this.supabase.from("Film").select(`id, name, 
        date, 
        note, 
        image, 
        Author (
        author
        )`);

    valeurDeRetour.data.forEach((film) => {
      const app = document.querySelector("#app");
      const card = document.createElement("div");
      const img = document.createElement("img");
      const infosContainer = document.createElement("div");
      const infos = document.createElement("div");
      const note = document.createElement("h3");
      const title = document.createElement("h2");
      const moreInfos = document.createElement("div");
      const author = document.createElement("p");
      const date = document.createElement("p");
      const deleteCard = document.createElement("p");

      card.classList.add("film");
      infosContainer.classList.add("infos-container");
      infos.classList.add("infos");
      note.classList.add("note");
      title.classList.add("title");
      moreInfos.classList.add("moreinfos");
      author.classList.add("author");
      date.classList.add("date");
      deleteCard.classList.add("deleteCard");

      app.appendChild(card);
      card.appendChild(img);
      card.appendChild(infosContainer);
      infosContainer.appendChild(infos);
      infosContainer.appendChild(note);
      infos.appendChild(title);
      infos.appendChild(moreInfos);
      moreInfos.appendChild(author);
      moreInfos.appendChild(date);
      card.appendChild(deleteCard);

      console.log(film);
      title.innerHTML = film.name;
      date.innerHTML = film.date;
      author.innerHTML = film.Author.author;
      note.innerHTML = film.note;
      img.src = film.image;
      deleteCard.innerHTML = "X";

      // renseigner avec setAttribute, l'attribut data-id, avec la valeur correspondant à l'ID de l'élément dans ma base
      card.setAttribute("data-id", film.id);

      deleteCard.addEventListener("click", (e) => this.deleteElement(e));
    });
  }
}

new Home();
