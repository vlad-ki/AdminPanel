from setuptools import setup, find_packages

setup(
    name="adminpanel",
    version='0.0.1',
    author="Vladimir Kipiani & Grigoriy Butovichev",
    author_email="inweb24.vk@gmail.com",
    packages=find_packages(),
    install_requires=[
        'pyramid',
        'pymongo'
    ],
    entry_points={
        'console_scripts':
            ['adminpanel = adminpanel.__main__:main']
    },
)