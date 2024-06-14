import os
import tqdm

files = ["output/Sourabh_Sharma.pptx"]

for f in tqdm.tqdm(files):
    command = "unoconv -f pdf \"{}\"".format(f)
    os.system(command)