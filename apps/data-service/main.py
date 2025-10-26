from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import xml.etree.ElementTree as ET
from typing import Dict, Any
import tempfile
import os

app = FastAPI(title="Data Processing Service", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint - service information"""
    return {
        "message": "Data Processing Service",
        "status": "running",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check() -> Dict[str, str]:
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "python-data-service",
        "timestamp": pd.Timestamp.now().isoformat()
    }


@app.post("/analyze/excel")
async def analyze_excel(file: UploadFile) -> Dict[str, Any]:
    """
    Analyze an Excel file and return structure information
    
    Args:
        file: Excel file upload (.xlsx or .xls)
        
    Returns:
        Dictionary containing columns, rows, shape, and data types
    """
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(
            status_code=400,
            detail="File must be Excel format (.xlsx or .xls)"
        )
    
    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        
        # Read Excel file
        df = pd.read_excel(temp_path)
        
        # Clean up temp file
        os.unlink(temp_path)
        
        # Return analysis results
        return {
            "columns": df.columns.tolist(),
            "rows": len(df),
            "shape": list(df.shape),
            "dtypes": df.dtypes.astype(str).to_dict()
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing Excel file: {str(e)}"
        )


@app.post("/analyze/xml")
async def analyze_xml(file: UploadFile) -> Dict[str, Any]:
    """
    Analyze an XML file and return structure information
    
    Args:
        file: XML file upload (.xml)
        
    Returns:
        Dictionary containing root element, child count, all elements, and attributes
    """
    if not file.filename.endswith('.xml'):
        raise HTTPException(
            status_code=400,
            detail="File must be XML format (.xml)"
        )
    
    try:
        # Read XML content
        content = await file.read()
        root = ET.fromstring(content)
        
        # Collect all unique element names
        all_elements = set()
        for elem in root.iter():
            all_elements.add(elem.tag)
        
        # Return analysis results
        return {
            "root": root.tag,
            "childCount": len(root),
            "allElements": sorted(list(all_elements)),
            "attributes": root.attrib
        }
    except ET.ParseError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid XML file: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing XML file: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
