import { useState, useEffect } from 'react';


const SurveyForm = () => {


    // State variables
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [surveyTopic, setSurveyTopic] = useState('');
    const [favLanguage, setFavLanguage] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [exerciseFrequency, setExerciseFrequency] = useState('');
    const [dietPreference, setDietPreference] = useState('');
    const [highestQualification, setHighestQualification] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [feedback, setFeedback] = useState('');
    const [additionalQuestions, setAdditionalQuestions] = useState([]);

    // Validation states
    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [surveyTopicError, setSurveyTopicError] = useState('');
    const [technologySectionError, setTechnologySectionError] = useState('');
    const [healthSectionError, setHealthSectionError] = useState('');
    const [educationSectionError, setEducationSectionError] = useState('');
    const [feedbackError, setFeedbackError] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation before submission
        if (validateForm()) {
            // Submit form logic can go here (e.g., send data to backend)
            console.log('Form submitted successfully:', {
                fullName,
                email,
                surveyTopic,
                favLanguage,
                yearsOfExperience,
                exerciseFrequency,
                dietPreference,
                highestQualification,
                fieldOfStudy,
                feedback,
                additionalQuestions
            });
            // Optionally reset form fields after successful submission
            resetForm();
        } else {
            console.log('Form has validation errors. Please check.');
        }
    };

    // Function to reset form fields
    const resetForm = () => {
        setFullName('');
        setEmail('');
        setSurveyTopic('');
        setFavLanguage('');
        setYearsOfExperience('');
        setExerciseFrequency('');
        setDietPreference('');
        setHighestQualification('');
        setFieldOfStudy('');
        setFeedback('');
        setAdditionalQuestions([]);
        // Reset error messages as well
        setFullNameError('');
        setEmailError('');
        setSurveyTopicError('');
        setTechnologySectionError('');
        setHealthSectionError('');
        setEducationSectionError('');
        setFeedbackError('');
    };

    const validateForm = () => {
        let isValid = true;

        // Validate Full Name
        if (!fullName.trim()) {
            setFullNameError('Full Name is required');
            isValid = false;
        } else {
            setFullNameError('');
        }

        // Validate Email
        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Validate Survey Topic
        if (!surveyTopic.trim()) {
            setSurveyTopicError('Survey Topic is required');
            isValid = false;
        } else {
            setSurveyTopicError('');
        }

        // Validate Technology Section if selected
        if (surveyTopic === 'Technology') {
            if (!favLanguage.trim()) {
                setTechnologySectionError('Favorite Programming Language is required');
                isValid = false;
            } else {
                setTechnologySectionError('');
            }

            if (!yearsOfExperience.trim()) {
                setTechnologySectionError(prevError => prevError + ' Years of Experience is required');
                isValid = false;
            } else {
                setTechnologySectionError('');
            }
        }

        // Validate Health Section if selected
        if (surveyTopic === 'Health') {
            if (!exerciseFrequency.trim()) {
                setHealthSectionError('Exercise Frequency is required');
                isValid = false;
            } else {
                setHealthSectionError('');
            }

            if (!dietPreference.trim()) {
                setHealthSectionError(prevError => prevError + ' Diet Preference is required');
                isValid = false;
            } else {
                setHealthSectionError('');
            }
        }

        // Validate Education Section if selected
        if (surveyTopic === 'Education') {
            if (!highestQualification.trim()) {
                setEducationSectionError('Highest Qualification is required');
                isValid = false;
            } else {
                setEducationSectionError('');
            }

            if (!fieldOfStudy.trim()) {
                setEducationSectionError(prevError => prevError + ' Field of Study is required');
                isValid = false;
            } else {
                setEducationSectionError('');
            }
        }

        // Validate Feedback
        if (!feedback.trim() || feedback.length < 50) {
            setFeedbackError('Feedback is required and must be at least 50 characters');
            isValid = false;
        } else {
            setFeedbackError('');
        }

        return isValid;
    };

    const isValidEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const fetchAdditionalQuestions = async (topic) => {
        try {
            const response = await fetch(`https://api.example.com/questions/${topic}`);
            if (!response.ok) {
                throw new Error('Failed to fetch additional questions');
            }
            const data = await response.json();
            setAdditionalQuestions(data.questions); // Assuming API returns an array of questions
        } catch (error) {
            console.error('Error fetching additional questions:', error.message);
            setAdditionalQuestions([]); // Reset questions on error
        }
    };

    useEffect(() => {
        if (surveyTopic) {
            fetchAdditionalQuestions(surveyTopic);
        }
    }, [surveyTopic]);

    const toggleSections = (topic) => {
        return topic === 'Technology' || topic === 'Health' || topic === 'Education';
    };

    return (
        <div className="survey-form">
            <h1>Survey Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                {fullNameError && <p className="error">{fullNameError}</p>}<br /><br />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {emailError && <p className="error">{emailError}</p>}<br /><br />

                <label htmlFor="surveyTopic">Survey Topic:</label>
                <select
                    id="surveyTopic"
                    value={surveyTopic}
                    onChange={(e) => {
                        setSurveyTopic(e.target.value);
                        setFavLanguage('');
                        setYearsOfExperience('');
                        setExerciseFrequency('');
                        setDietPreference('');
                        setHighestQualification('');
                        setFieldOfStudy('');
                        setAdditionalQuestions([]);
                    }}
                    required
                >
                    <option value="">Select Topic</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                </select>
                {surveyTopicError && <p className="error">{surveyTopicError}</p>}<br /><br />

                {/* Technology Section */}
                {surveyTopic === 'Technology' && (
                    <div className="section">
                        <label htmlFor="favLanguage">Favorite Programming Language:</label>
                        <select
                            id="favLanguage"
                            value={favLanguage}
                            onChange={(e) => setFavLanguage(e.target.value)}
                            required
                        >
                            <option value="">Select Language</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="C#">C#</option>
                        </select>
                        {technologySectionError && <p className="error">{technologySectionError}</p>}<br /><br />

                        <label htmlFor="yearsOfExperience">Years of Experience:</label>
                        <input
                            type="number"
                            id="yearsOfExperience"
                            value={yearsOfExperience}
                            onChange={(e) => setYearsOfExperience(e.target.value)}
                            required
                        />
                        {technologySectionError && <p className="error">{technologySectionError}</p>}<br /><br />
                    </div>
                )}


                {/* Health Section */}
                {surveyTopic === 'Health' && (
                    <div className="section">
                        <label htmlFor="exerciseFrequency">Exercise Frequency:</label>
                        <select
                            id="exerciseFrequency"
                            value={exerciseFrequency}
                            onChange={(e) => setExerciseFrequency(e.target.value)}
                        >
                            <option value="">Select Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Rarely">Rarely</option>
                        </select><br /><br />

                        <label htmlFor="dietPreference">Diet Preference:</label>
                        <select
                            id="dietPreference"
                            value={dietPreference}
                            onChange={(e) => setDietPreference(e.target.value)}
                        >
                            <option value="">Select Preference</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                        </select><br /><br />
                        {healthSectionError && <p className="error">{healthSectionError}</p>}<br /><br />
                    </div>
                )}

                {/* Education Section */}
                {surveyTopic === 'Education' && (
                    <div className="section">
                        <label htmlFor="highestQualification">Highest Qualification:</label>
                        <select
                            id="highestQualification"
                            value={highestQualification}
                            onChange={(e) => setHighestQualification(e.target.value)}
                        >
                            <option value="">Select Qualification</option>
                            <option value="High School">High School</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="PhD">PhD</option>
                        </select><br /><br />

                        <label htmlFor="fieldOfStudy">Field of Study:</label>
                        <input
                            type="text"
                            id="fieldOfStudy"
                            value={fieldOfStudy}
                            onChange={(e) => setFieldOfStudy(e.target.value)}
                        /><br /><br />
                        {educationSectionError && <p className="error">{educationSectionError}</p>}<br /><br />
                    </div>
                )}

                {/* Additional Questions Section */}
                {additionalQuestions.length > 0 && (
                    <div className="section">
                        <h3>Additional Questions:</h3>
                        {additionalQuestions.map((question, index) => (
                            <div key={index}>
                                <label>{question.label}</label>
                                <input
                                    type={question.type}
                                    value={question.answer}
                                    onChange={(e) => {

                                        const updatedQuestions = [...additionalQuestions];
                                        updatedQuestions[index].answer = e.target.value;
                                        setAdditionalQuestions(updatedQuestions);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <label htmlFor="feedback">Feedback:</label><br />
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows="4"
                        cols="50"
                    /><br /><br />
                    {feedbackError && <p className="error">{feedbackError}</p>}<br /><br />
                </div>


                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SurveyForm;
