// Validate Email
export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format.";
  };
  
  // Validate Password
  export const validatePassword = (password: string) => {
    return password.length >= 6 ? "" : "Password must be at least 6 characters.";
  };
  
  // Validate Name (Full Name for both Developer & Entrepreneur)
  export const validateName = (name: string) => {
    return name.trim().length > 1 ? "" : "Full name is required.";
  };
  
  // Validate Field Selection (For Developer Track & Entrepreneur Field)
  export const validateFieldSelection = (field: string) => {
    return field.trim().length > 0 ? "" : "Please select an option.";
  };
  
  // Validate Password Confirmation
  export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword ? "" : "Passwords do not match.";
  };
  
  // Validate Multi-Select (Technologies - For Developers Only)
  export const validateTechnologies = (technologies: string[]) => {
    return technologies.length >= 3 ? "" : "Please select at least three technologies.";
  };
  
  // Validate Individual Fields (Handles Both Developer & Entrepreneur)
  export const validateField = (name: string, value: string | string[], formData: any) => {
    switch (name) {
      case "fullName":
        return validateName(value as string);
      case "email":
        return validateEmail(value as string);
      case "password":
        return validatePassword(value as string);
      case "confirmPassword":
        return validateConfirmPassword(formData.password, value as string);
      case "track": // Developer
      case "field": // Entrepreneur
        return validateFieldSelection(value as string);
      case "technologies":
        return validateTechnologies(value as string[]);
      default:
        return "";
    }
  };
  
  export const validateStep1 = (formData: any, userRole: "developer" | "entrepreneur") => {
    const errors: Partial<{ [key: string]: string }> = {}; // Allow missing fields
  
    // fields for both Developer & Entrepreneur
    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);
    errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
  
    // Only validate `fullName` for Developers in Step 1
    if (userRole === "developer") {
      errors.fullName = validateName(formData.fullName);
    }
  
    return errors;
  };
  
  export const validateStep2 = (formData: any, userRole: "developer" | "entrepreneur") => {
    let errors = userRole === "developer"
      ? {
          fullName: validateName(formData.fullName), // Full name validation for Developers in Step 2
          track: validateFieldSelection(formData.track),
          technologies: validateTechnologies(formData.technologies),
        }
      : {
          fullName: validateName(formData.fullName), // Full name validation for Entrepreneurs in Step 2
          field: validateFieldSelection(formData.field),
        };
  
    // Remove undefined or irrelevant properties
    return Object.fromEntries(
      Object.entries(errors).filter(([_, value]) => value !== undefined)
    );
  };
  