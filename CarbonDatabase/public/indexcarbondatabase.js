import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { carbonTotal } from '../carbonTotal.js';
const app = express();


app.use(express.static('public'))
app.use(express.json())
app.use(cors())


const db = await sqlite.open({
    filename: './carbon.db',
    driver: sqlite3.Database
})


await db.migrate();

app.get('/api/carbon/projects', async (req, res) => {
    const { projects } = req.body
    const allProjects = await db.all(`SELECT * FROM projects`);
    console.log(...allProjects);
    res.status(200).json({...allProjects});
})

app.post('/api/carbon/add', async (req, res) => {
    const { project_id, project_name, scope, total_credits_available, total_credits_issued } = req.body
    const total = await db.get(`INSERT INTO projects (project_id,project_name,scope,total_credits_available,total_credits_issued) VALUES (?,?,?,?,?)`, [project_id, project_name, scope, total_credits_available, total_credits_issued]);
    res.status(200).json({ message: 'Project Created Successfully' });
})

app.post('/api/carbon/delete', async (req, res) => {
    const { project_id } = req.body;
    const total = await db.run(`DELETE FROM projects WHERE project_id =?`, [project_id]);
    res.status(200).json({ message: 'Project Deleted Successfully' });
})

app.post('/api/carbon/update', async (req, res) => {
    const { project_id, project_name, scope, total_credits_available, total_credits_issued } = req.body
    const total = await db.run(`UPDATE projects SET project_id = ?,project_name = ?,scope = ?,total_credits_available = ?,total_credits_issued = ? WHERE project_id = ?`, [project_id, project_name, scope, total_credits_available, total_credits_issued, project_id]);
    res.status(200).json({ message: 'Project Updated Successfully' });
})

app.post('/api/carbon/seller', async (req, res) => {
    const { total_credits_available } = req.body
    const allProjects = await db.all(`SELECT project_id, project_name,scope,  MAX (total_credits_available) FROM projects WHERE total_credits_available < ?`,[total_credits_available]);
    res.status(200).json({...allProjects});
})

const PORT = process.env.PORT || 4003
app.listen(PORT, () => console.log(`Server started ${PORT}`))

