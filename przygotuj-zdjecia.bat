@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Przygotowuje zdjecia z folderu zdjecia\ ...
echo.
python -c "import PIL, numpy" 2>nul || (
  echo Instaluje biblioteki Pillow i numpy...
  python -m pip install --user Pillow numpy
)
python narzedzia\przygotuj_zdjecia.py
echo.
pause
