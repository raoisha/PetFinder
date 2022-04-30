function ReportFoundPet() {
    return (
        <form>
        <label>Enter pet name:
            <input type="text" />  
        </label>
        <label>Enter pet color:
            <input type="text" />  
        </label>
        <label>Enter pet breed:
            <input type="text" />  
        </label>
        <label>Enter pet photo:
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"/>  
        </label>
        <input type="submit" />
    </form>
            
    );
}

export default ReportFoundPet;