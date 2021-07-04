import NavbarAdmin from "../../components/layout/NavbarAdmin"
import {Spinner, Container, Row, Col, Button, Table} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useState, useEffect, useContext, useRef} from 'react'
import { apiUrl } from "../../contexts/constants"
const _ = require('lodash');

const AdminLesson = (props) => {
    const [listLesson, setListLesson] = useState([])
    const [listExLesson, setListExLesson] = useState([])
    // const [no, setNo] = useState(0)
    

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await axios.post(`${apiUrl}/api/auth/getLearnPage`)
                const resEx = await axios.post(`${apiUrl}/api/auth/getExercisePage`)

                for (var i = 0; i < res.data.length; i++){
                    setListLesson(listLesson => [...listLesson, ...res.data[i].listLesson])

                }

                for (var i = 0; i < resEx.data.length; i++){
                    setListExLesson(listExLesson => [...listExLesson, ...resEx.data[i].exListLesson] )
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        getList();
    }, [])
    return (
        <div>
            <NavbarAdmin/>
            <div>
                <h3 style={{textAlign :'center'}}>Danh sách chủ đề ngữ pháp</h3>
                <Table striped bordered hover size="sm" style={{width : '900px', marginLeft : 'auto', marginRight : 'auto'}}>
                    <thead>
                        <tr>
                        <th>Sửa</th>
                        <th>ID</th>
                        <th>Tên tiếng Anh</th>
                        <th>Tên tiếng Việt</th>
                        <th>Số bài học</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listLesson.map((lesson, no) => (
                            <tr >
                                <td style={{width : '100px'}}><Button variant='primary'>Sửa</Button></td>
                                <td style={{width : '80px'}}>{no+ 1}</td>
                                <td style={{width : '300px'}}>{lesson.lessonNameEn}</td>
                                <td style={{width : '300px'}}>{lesson.lessonNameVn}</td>
                            </tr>
                        ))}                     
                    </tbody>
                </Table>
                <br/>
                <br/>
                <br/>
                <h3 style={{textAlign :'center'}}>Danh sách chủ đề bài tập</h3>
                <Table striped bordered hover size="sm" style={{width : '900px', marginLeft : 'auto', marginRight : 'auto'}}>
                    <thead>
                        <tr>
                        <th>Sửa</th>
                        <th>ID</th>
                        <th>Tên tiếng Anh</th>
                        <th>Tên tiếng Việt</th>
                        <th>Số bài học</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listExLesson.map((exLesson, noEx) => (
                            <tr >
                                <td style={{width : '100px'}}><Button variant='primary'>Sửa</Button></td>
                                <td style={{width : '80px'}}>{noEx+ 1}</td>
                                <td style={{width : '300px'}}>{exLesson.exLessonNameEn}</td>
                                <td style={{width : '300px'}}>{exLesson.exLessonNameVn}</td>
                            </tr>
                        ))}                     
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AdminLesson