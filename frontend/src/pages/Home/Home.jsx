import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
const Home = () => {
    const [Category,setCategory] = useState("ALL")
    return (
        <div>
            <Header/>
            <ExploreMenu Category= {Category} setCategory={setCategory}/>
        </div>
    )
}

export default Home