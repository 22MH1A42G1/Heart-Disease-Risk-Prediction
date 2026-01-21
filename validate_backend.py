"""
Simple validation script to check if all modules can be imported
"""
import sys
import importlib.util

def check_module(module_name):
    """Check if a module exists and can be imported"""
    spec = importlib.util.find_spec(module_name)
    return spec is not None

# Check required packages
required_packages = [
    'fastapi',
    'uvicorn',
    'sqlalchemy',
    'psycopg2',
    'pydantic',
    'jose',
    'passlib',
    'sklearn',
    'pandas',
    'numpy',
    'shap'
]

print("Checking required packages...")
all_present = True
for package in required_packages:
    package_name = package.replace('-', '_')
    if package == 'sklearn':
        package_name = 'sklearn'
    elif package == 'jose':
        package_name = 'jose'
    
    present = check_module(package_name)
    status = "✓" if present else "✗"
    print(f"  {status} {package}")
    if not present:
        all_present = False

if all_present:
    print("\n✓ All required packages are available")
    print("\nChecking app modules...")
    
    # Check if app modules can be imported (syntax validation)
    app_modules = [
        'app.database',
        'app.models',
        'app.schemas',
        'app.auth',
        'app.federated',
        'app.prediction',
        'app.main'
    ]
    
    for module in app_modules:
        try:
            __import__(module)
            print(f"  ✓ {module}")
        except Exception as e:
            print(f"  ✗ {module}: {str(e)}")
            all_present = False
    
    if all_present:
        print("\n✓ All app modules can be imported successfully")
        print("\n✓ Backend implementation is valid!")
        sys.exit(0)
    else:
        print("\n✗ Some app modules have errors")
        sys.exit(1)
else:
    print("\n✗ Some required packages are missing")
    print("\nTo install missing packages, run:")
    print("  pip install -r requirements.txt")
    sys.exit(1)
