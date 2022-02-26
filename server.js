const Sequelize = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/dealers_choice_react_db");
const { STRING } = sequelize

const Team = sequelize.define('team', {
    team_name: {
        type: Sequelize.STRING,
        unique: true,
             allowNull: false,
        validate: {
            notEmpty: false
        }
    }
})

const express = require("express")
const app = express()
const path = require('path')

app.get('/', async(req,res) => res.sendFile(path.join(__dirname, 'index.html')))


app.get('/api/teams', async(req,res,next) => {
    try {
        res.send(await Team.findAll())
    } catch(err) {
        
    }
})

const init = async(req, res, next) => {
    await sequelize.sync({force: true})
    const [ Giants, Eagles, Cowboys, Commanders ] = await Promise.all(
    ['New York Giants','Philedelphia Eagles', 'Dallas Cowboys', 'Washington Commanders'].map((team => Team.create({team_name: team})))
    )
    
    const port = process.env.PORT || 8080
    app.listen(port, () => console.log(`listening on port ${port}`))
}


init()