# Survey Form

#Tasks:

1.Form Fields:
              ○ Full Name (Text)
              ○ Email (Email)
              ○ Survey Topic (Dropdown: Technology, Health, Education)
              ○ Technology Section (Visible if "Technology" is selected):
                    ■ Favorite Programming Language (Dropdown: JavaScript, Python,
                     Java, C#)
                    ■ Years of Experience (Number)
              ○ Health Section (Visible if "Health" is selected):
                    ■ Exercise Frequency (Dropdown: Daily, Weekly, Monthly, Rarely)
                    ■ Diet Preference (Dropdown: Vegetarian, Vegan, Non-Vegetarian)
              ○ Education Section (Visible if "Education" is selected):
                    ■ Highest Qualification (Dropdown: High School, Bachelor's, Master's,
                      PhD)
                    ■ Field of Study (Text)
            ○ Feedback (Textarea)

            
2. Conditional Logic:
             ○ Show "Technology Section" if "Technology" is selected as the survey topic.
             ○ Show "Health Section" if "Health" is selected as the survey topic.
             ○ Show "Education Section" if "Education" is selected as the survey topic.
             ○ Fetch and display additional questions based on the selected survey topic
             using an external API.

3. Validation:
            ○ Full Name: Required
            ○ Email: Required and must be a valid email format
            ○ Survey Topic: Required
            ○ Technology Section Fields: Required if "Technology" is selected, and
              validate accordingly
            ○ Health Section Fields: Required if "Health" is selected, and validate
              accordingly
            ○ Education Section Fields: Required if "Education" is selected, and validate
              accordingly
            ○ Feedback: Required and must be at least 50 characters


Requirements:
● Use React functional components and hooks (useState, useEffect, useContext).
● Implement custom hooks for form validation and management.
● Integrate with an external API for data fetching.
● Ensure a clean and user-friendly interface with clear error messages.





