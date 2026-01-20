from PIL import Image
import os
import glob

# 设置输入和输出目录
input_dir = '/Users/mac/work-app/gameplay-code/puzzle-yarnfun/images/icon'
output_dir = '/Users/mac/work-app/gameplay-code/puzzle-yarnfun/images/icon'

# 确保输出目录存在
os.makedirs(output_dir, exist_ok=True)

# 获取所有.webp图片
webp_files = glob.glob(os.path.join(input_dir, '*.webp'))

# 排序文件（按原始命名顺序）
webp_files.sort()

# 设置目标尺寸
target_size = (80, 80)

# 处理每张图片
for i, file_path in enumerate(webp_files, 1):
    # 构建新文件名
    new_filename = f'avatar_{i:02d}.webp'
    new_file_path = os.path.join(output_dir, new_filename)
    
    # 打开图片
    with Image.open(file_path) as img:
        # 保持原始比例，调整大小并填充
        img.thumbnail(target_size, Image.Resampling.LANCZOS)
        
        # 创建新的RGB图像，背景为白色
        new_img = Image.new('RGB', target_size, (255, 255, 255))
        
        # 计算居中位置
        paste_x = (target_size[0] - img.width) // 2
        paste_y = (target_size[1] - img.height) // 2
        
        # 将调整大小后的图片粘贴到中心
        new_img.paste(img, (paste_x, paste_y))
        
        # 保存图片
        new_img.save(new_file_path, 'WEBP', quality=90)
    
    # 删除原始文件
    os.remove(file_path)
    
    print(f'Processed {new_filename}')

print(f'All {len(webp_files)} images have been renamed and resized to {target_size[0]}x{target_size[1]} pixels.')