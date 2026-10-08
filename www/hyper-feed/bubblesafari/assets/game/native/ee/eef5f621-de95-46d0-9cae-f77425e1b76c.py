#encoding=utf-8
import os
import re

directory = os.getcwd()

# 获取目录下所有文件名
file_names = os.listdir(os.getcwd())

# 遍历文件名
for file_name in file_names:
    if "_s38" in file_name:
        new_file_name = re.sub("_s38", "", file_name)
        # 构建新的文件路径
        old_path = os.path.join(directory, file_name)
        new_path = os.path.join(directory, new_file_name)
        print(old_path,new_path)
        # 重命名文件
        os.rename(old_path, new_path)
