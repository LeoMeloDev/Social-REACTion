import React from 'react'
import './App.css';
import Header from './components/Header'
import Post from './components/Post'

const App = (props) => {
  
  return (
    <div className="app">
      <Header title="Social REACTion"/>
      <Post 
        userName= "Leo_Melo"
        image="https://s.yimg.com/ny/api/res/1.2/12UU2JphAsbxTTDca.7QFQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9MTA4MDtoPTcxNg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae"
        alt="mountain"
        caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lectus quis est venenatis molestie quis sed urna. Nunc vestibulum odio vitae porttitor egestas. Sed ut volutpat eros, et rutrum est. Aenean nec bibendum odio."
      />

      <Post 
        userName= "Raqa_Sol"
        image="https://s.yimg.com/ny/api/res/1.2/12UU2JphAsbxTTDca.7QFQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9MTA4MDtoPTcxNg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-11/7b5b5330-112b-11ea-a77f-7c019be7ecae"
        alt="mountain"
        caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lectus quis est venenatis molestie quis sed urna. Nunc vestibulum odio vitae porttitor egestas. Sed ut volutpat eros, et rutrum est. Aenean nec bibendum odio."
      />
    </div>
  )
}

export default App;
