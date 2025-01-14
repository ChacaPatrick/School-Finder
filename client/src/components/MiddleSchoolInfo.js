import React from 'react'
import Map from '../components/SchoolMap';
import ReviewCard from "../components/ReviewCard";

const MiddleSchoolInfo = ({data, userReviewData}) => {
    console.log("middle school data: ", data);
    return (
        <div>
            <h1 className="text-center">{data.name}</h1>
            <div className="row m-auto shadow p-3 mb-5 bg-white rounded">
                <div className="card col-md-4 col-sm-12">
                    <div className="card-body dark-purple">
                        <h3 class="card-title">General</h3>
                        <p className="card-text">Grades: {data.gradespan}</p>
                        <p className="card-text">Total Students: {data.totalstudents}</p>
                        <p className="card-text">Time: {data.start_time} - {data.end_time}</p>
                        <p>Accessibility: {data.accessibility_description}</p>
                 </div>
                </div>
                <div className="card col-md-4 col-sm-12">
                     <div className="card-body dark-purple">
                        <h3 className="card-title">Location</h3>
                        <h6 className="card-subtitle mb-2">Borough: {data.borough}</h6>
                        <p className="card-text">Address: {data.address}</p>
                        <h6 className="card-subtitle mb-2">Transportation: </h6>
                        <p className="card-text">Subway: {data.subway}</p>
                        <p className="card-text">Bus: {data.bus}</p>
                     </div>
               </div>
                <div className="card col-md-4 col-sm-12">
                    <div className="card-body dark-purple">
                        <h3 className="card-title">Contact</h3>
                        <p className="card-text">Phone: {data.telephone}</p>
                        <a href={`https://${data.independentwebsite}`} target="_blank">{data.independentwebsite}</a>
                    </div>
                </div>
            </div>
            <div class="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-body col-12">
                    
                    <h3 className="card-title text-center">Overview</h3>
                    <p className="card-text text-center text-justify">{data.overview}</p>
               
            
                </div>
            </div>
            <div className="row m-auto shadow p-3 mb-5 bg-white rounded">
                <div className="card col-md-6 col-sm-12">
                    <div className="card-body dark-purple">
                        <div class = "col-8">
                            <h3 className="card-title">Adcademics</h3>
                            <h6 className="card-subtitle mb-2">Elective Courses:</h6>
                            <p className="card-text">{data.electiveclassNamees}</p>
                            <h6 className="card-subtitle mb-2">Language Courses:</h6>
                            <p className="card-text">{data.languageclassNamees}</p>
                        </div>
                    </div>
                </div>
                <div className="card col-md-6 col-sm-12">
                    <div className="card-body dark-purple">
                        <div class = "col-8">
                        <h3 className="card-title">Activties</h3>
                        <h6 className="card-subtitle mb-2">Extracurricular: </h6>
                        <p className="card-text">{data.activities_description}</p>
                        <h6 className="card-subtitle mb-2">Sports: </h6>
                        <p className="card-text">{data.othersports}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body justify-content-center mx-auto col-8">
                    <h3 class="card-title text-center">Reviews</h3> 
                    <ReviewCard reviews={userReviewData}/>
                </div>
            </div>
            <Map data={data} name={data.name}/>
        </div>
    )
}

export default MiddleSchoolInfo
