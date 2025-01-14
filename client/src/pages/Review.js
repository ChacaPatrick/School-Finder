import React, {useState, useEffect} from 'react';
import { useAuth } from "../contexts/AuthContext";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import {Alert} from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import SchoolDropdown from "../components/SchoolDropdown"; 
import InputForm from '../components/ReviewInputForms';
import {
    elementarySchoolData,
    middleSchoolData,
    highSchoolData,
} from "../utils/schoolDataFields.js";

export default function Review() {
    const [rating, setRating] = useState(null); 
    const { currentUser } = useAuth();
    const [schoolNameError, setSchoolNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [ratingError, setRatingError] = useState('')
    const [schoolJSON, setJSON] = useState(null);
    const [loading, setLoading] = useState(true);
    const [items, setItems ]= useState([]);
    const [compItems, setCompItems] = useState([]);
    const [schoolGrade, setSchoolGrade] = useState(null);
    const [url, setUrl] = useState(null);
    const [selectedSchools, setSelectedSchools] = useState(null);
    
    
    useEffect(() => {
        if (url !== null) {
            let dataFields;
            switch (schoolGrade) {
              case "elementary":
                dataFields = elementarySchoolData;
                break;
              case "middle":
                dataFields = middleSchoolData;
                break;
              case "highschool":
                dataFields = highSchoolData;
                break;
              default:
                break;
            }
            const options = {
              type: "GET",
              data: {
                $limit: 5000,
                $$app_token: "YOURAPPTOKENHEREs",
              },
            };
            fetch(url, options)
              .then((res) => res.json())
              .then((data) => {
                let tempItems = [];
                let tempComp = [];
                let index = 0;
                data.forEach((e) => {
                  let infoItem = {};
                  infoItem.id = index++;
                  dataFields.forEach((dataField) => {
                    infoItem[dataField] = e[dataField];
                  });
      
                  tempItems.push(infoItem);
                  tempComp[e.school_name] = e.dbn;
                });
                setItems(tempItems);
                setCompItems(tempComp);
                setJSON(data)
                console.log(tempItems)
              })
              .catch((err) => console.log("API ERROR: ", err));
            // fetch for all of user's review
        }
        const options ={
          type: "GET",
          data: {
            "$limit" : 5000,
            "$$app_token" : "YOURAPPTOKENHEREs"
          }
        };
       
      }, [url])

    // Catch Rating value
    const handleRating = (event, rate) => {
        console.log(rate)
        setRating(rate)
    }

    const submission = (e) => {
        e.preventDefault()
        e.persist();
        console.log(e);
        let noErrors = true

        if(e.target[0].defaultValue in compItems === false){
            e.preventDefault()
            noErrors = false
            setSchoolNameError('Please type in the correct school name.');
        }
        else{
            setSchoolNameError('');
        }

        if(e.target[1].value === ""){
            e.preventDefault()
            noErrors = false
            setDescriptionError("Please fill in your description.");
        }
        else{
            setDescriptionError('');
        }
        if(rating === null){
            e.preventDefault()
            noErrors = false
            setRatingError('Please provide a rating.');
        }
        else{
            setRatingError('');
        }
        if (noErrors === false){
            return
        }
        
        const data = { 
            reviewewUUID: currentUser.uid,
            reviewerEmail: currentUser.email,
            schoolName: e.target[0].defaultValue,
            schoolDBID: compItems[e.target[0].defaultValue],
            description: e.target[1].value,
            rating: rating,
        }

        // NOTE STILL NEED TO IMPLMENT ! 
        //fetch request needs to check if reviewer already submitted a review for this school

        //Change according to deployed backend after we deploy
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/review/addReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.open('/profile', '_self');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
       
    }

    const styles = {
        zIndex: "1"
    }
    
    const handleOnSearch = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      console.log('OnSearch', string, results)
    }
  
    const handleOnSelect = (item) => {
      // the item selected
      console.log('OnSelect',item)
    }
  
    const handleOnFocus = () => {
      console.log('Focused')
    }

    const handleDropdown = (schoolGrade, url) => {
        console.log(url, schoolGrade);
        setSchoolGrade(schoolGrade);
        setUrl(url);
        setSelectedSchools(null);
    };

    // Review card display by School
  
    return (
        <div className="col-3 text-center m-auto">
            <h1>Submit a Review</h1>
            <SchoolDropdown 
              schoolGrade={(schoolGrade, url) => handleDropdown(schoolGrade, url)}
            />
            {
                schoolGrade?
                <form className="input-large" onSubmit={ (e) => submission(e) }>
                    <InputForm items = {items}  compItems = {compItems} schoolGrade={schoolGrade}/>
                    {schoolNameError && <Alert className=" mt-2 mb-auto" variant="danger">{schoolNameError}</Alert>}
                    <div className="form-group">
                        <label for="description">Description</label>
                        <textarea className="form-control" id="description" rows="10"></textarea>
                    </div>
                    {descriptionError && <Alert className=" mt-2 mb-auto" variant="danger">{descriptionError}</Alert>}
                    <div className="form-group">
                        <p>Rating</p>
                        <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={handleRating}
                        />
                    </div>
                    {ratingError && <Alert className=" mt-2 mb-auto" variant="danger">{ratingError}</Alert>}
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </form>    
                :
                <div className=" container-fluid text-center ">
                    <p>Please select a school option.</p>
                    {
                        /*
                        <div className="form-group inputSetting">
                            <ReactSearchAutocomplete 
                                items={items}
                                onSearch={handleOnSearch}
                                onSelect={handleOnSelect}
                                onFocus={handleOnFocus}
                                fuseOptions={{ keys:["school_name"] }}
                                resultStringKeyName= "school_name"
                                styling ={styles}
                                placeholder="Search School Name"
                                autoFocus
                            />
                        </div>
                        */
                     }
                </div>
               
            }
            
          
        </div>
    );
}