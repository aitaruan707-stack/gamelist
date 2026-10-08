import os
import json

def merge_json_files():
    # 获取当前目录路径
    current_dir = os.getcwd()
    
    # 遍历当前目录下的所有文件
    files = os.listdir(current_dir)
    
    # 定义一个字典用于保存合并后的数据
    merged_data = {}
    
    for file_name in files:
        # 判断是否为 JSON 文件
        if file_name.endswith(".json"):
            file_path = os.path.join(current_dir, file_name)
            
            # 解析文件名中的数值
            key = int(''.join(filter(str.isdigit, file_name)))
            
            # 读取文件内容
            with open(file_path, 'r') as f:
                content = json.load(f)
            
            # 将数值作为 key，内容作为 value 加入到字典中
            merged_data[key] = content
    
    # 将合并后的数据保存为 level.json 文件
    output_file = os.path.join(current_dir, "level.json")
    with open(output_file, 'w') as f:
        json.dump(merged_data, f)

# 调用函数进行合并操作
merge_json_files()
